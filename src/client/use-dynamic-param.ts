import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const getParam = (value: string | string[] | undefined) => {
  if (!value || value.length === 0) {
    throw new Error("No dynamic param!");
  }

  if (typeof value === "string") {
    return value;
  }

  return value[0];
};

const useDynamicParam = (key: string) => {
  const router = useRouter();
  const [param, setParam] = useState<string | undefined>();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    setParam(getParam(router.query[key]));
  }, [router, key]);

  return param;
};

export default useDynamicParam;
