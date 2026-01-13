import { create } from "zustand";
import { combine, subscribeWithSelector, persist, createJSONStorage, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

// type Store = {
//   count: number;
//   increase: () => void;
//   decrease: () => void;
// };
//
// export const useCountStore = create<Store>((set, get) => ({
//   count: 0,
//   increase: () => {
//     set((store) => ({
//       count: store.count + 1,
//     }));
//   },
//   decrease: () => {
//     set((store) => ({
//       count: store.count - 1,
//     }));
//   },
// }));

export const useCountStore = create(
  devtools(
    persist(
      subscribeWithSelector(
        immer(
          combine({ count: 0 }, (set, get) => ({
            increase: () => {
              set((state) => {
                state.count += 1;
              });
            },
            decrease: () => {
              set((state) => {
                state.count -= 1;
              });
            },
          })),
        ),
      ),
      {
        name: "countStore",
        partialize: (state) => ({
          count: state.count,
        }),
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
    { name: "countStore" },
  ),
);

useCountStore.subscribe(
  (store) => store.count,
  (count, prevCount) => {
    console.log(count, prevCount);
  }
);

export const useCount = () => {
  return useCountStore((store) => store.count);
};

export const useIncreaseCount = () => {
  return useCountStore((store) => store.increase);
};

export const useDecreaseCount = () => {
  return useCountStore((store) => store.decrease);
};