import { CatImages } from "@/apis/types";
import { GetServerSideProps } from "next";
import { NextRequest } from "next/server";
import React from "react";
import Home from "./home";

export default function Index(request: NextRequest) {
  return (
    <>
      <Home />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async function getServerSideProps(
  ctx
) {
  let cats: CatImages[] = [];

  return {
    props: {
      hydrationData: {
        catStore: {
          cats,
        },
      },
    },
  };
};