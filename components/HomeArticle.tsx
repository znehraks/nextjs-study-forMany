import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { Input } from "antd";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { getUser, getUserOne } from "../lib/api/user";
import { userData, userIdAtom } from "../store";
import { motion } from "framer-motion";

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  min-height: 100vh;
  background-color: antiquewhite;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const UserContainer = styled.div`
  width: 50%;
  height: 100%;
  background-color: antiquewhite;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.div`
  width: auto;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const HomeArticle = () => {
  const queryClient = new QueryClient();

  /**
   * userId를 담는 recoil
   */
  const [userId, setUserId] = useRecoilState(userIdAtom);

  /**
   * user전체 data를 fetch하는 query
   */
  const { isLoading, error, data } = useQuery<userData[]>(["users"], getUser, {
    refetchInterval: 1000,
    _optimisticResults: "optimistic",
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  /**
   * user개별 data를 fetch하는 query
   */
  const {
    isLoading: oneIsLoading,
    error: oneError,
    data: oneData,
  } = useQuery<userData>(["userOne", userId], () => getUserOne(userId));

  /**
   * control은 antd등 ui라이브러리의 input등 컴포넌트를 사용할 때 필요함
   */
  const { control, reset, handleSubmit } = useForm();

  /**
   * react query의 mutation 로직을 사용하기 위해 작성
   */
  const mutation = useMutation(
    (newUser: userData) => {
      return axios.post("/user", newUser);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
      },
    }
  );
  console.log(data);
  if (isLoading) return <>...Loading</>;
  if (error) return <>...error</>;
  return (
    <Wrapper>
      <Link href={"/"}>
        <a>Back to Home</a>
      </Link>
      <UserContainer>
        {data?.map((item: userData) => (
          <ContentWrapper onClick={() => setUserId(item.id)} key={item.id}>
            <div>{item.name}</div>
            <div>{item.detail}</div>
          </ContentWrapper>
        ))}
      </UserContainer>
      {mutation.isLoading ? (
        <>작성중...</>
      ) : (
        <>
          {oneIsLoading && <>one로딩중...</>}
          {oneError && <>oneError...</>}
          {oneData && (
            <>
              {oneData.name}
              {oneData.detail}
              <Link href={`/products/${oneData.id}`}>
                <a>{oneData.id}로 이동</a>
              </Link>
            </>
          )}
          {mutation.isError ? (
            <>작성에러...</>
          ) : (
            <InputContainer>
              <div>
                name:{" "}
                <Controller
                  render={({ field }) => <Input {...field} />}
                  name="name"
                  control={control}
                  defaultValue=""
                />
              </div>
              <div>
                detail:{" "}
                <Controller
                  render={({ field }) => <Input {...field} />}
                  name="detail"
                  control={control}
                  defaultValue=""
                />
              </div>
              <button
                onClick={(e) => {
                  if (!data || data.length === 0) return;
                  e.preventDefault();
                  handleSubmit((res) => {
                    console.log(res);
                    mutation.mutate({
                      id: data.length + 1,
                      name: res.name,
                      detail: res.detail,
                    });
                    reset();
                  })(e);
                }}
              >
                생성
              </button>
            </InputContainer>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default HomeArticle;
