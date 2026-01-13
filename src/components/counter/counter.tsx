import { useCount } from "@/store/count.ts";

export default function Controller() {
  const count = useCount();

  return <div>{count}</div>;
}