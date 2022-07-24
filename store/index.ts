import axios from "axios";
import { atom, selector } from "recoil";
import { v4 } from "uuid";
/**
 * user의 id를 저장하는 atom
 */
export const userIdAtom = atom<number>({
  key: `userId${v4()}`,
  default: 0,
});

export interface userData {
  id: number;
  name: string;
  detail: string;
}

export const userDataAtom = atom<userData[]>({
  key: `userData${v4()}`,
  default: [],
});

export const userDataSelector = selector<userData[]>({
  key: `userData${v4()}`,
  get: async () => {
    const userData = await axios.get<userData[]>("http://localhost:9000/user");
    return userData.data;
  },
});
