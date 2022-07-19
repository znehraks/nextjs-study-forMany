import axios from "axios";
import { atom, selector } from "recoil";

/**
 * user의 id를 저장하는 atom
 */
export const userIdAtom = atom<number>({
  key: `userId`,
  default: 0,
});

interface userData {
  id: number;
  name: string;
  detail: string;
}
export const userDataSelector = selector<userData[]>({
  key: `userData`,
  get: async ({ get }) => {
    const userId = get(userIdAtom);
    const userData = await axios.get<userData[]>("http://localhost:9000/user");
    return userData.data;
  },
});
