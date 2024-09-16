"use client";
import api from "@/app/lib/axios.interceptor";
import HeaderNav from "@/components/headerNav";
import ScrollBar from "@/components/scrollBar";
import ScrollFood from "@/components/scrollFood";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Home() {


  const banneritems = [
    {
      id: "1",
      name: "anh 1",
      url: "/images/map1.png",
    },
    {
      id: "2",
      name: "anh 2",
      url: "/images/map2.png",
    },
    {
      id: "3",
      name: "anh 32",
      url: "/images/map3.png",
    },
    {
      id: "3",
      name: "anh 32",
      url: "/images/map4.png",
    },
  ];
  

  const [todaysFood, setTodaysFood] = useState([]);
  const [flashSale, setFlashSale] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getTodayFood();
    getCategories();
    getFlashSale();
  }, []);

  const getTodayFood = async () => {
    await api.get("http://localhost:8000/products").then((res) => {
      setTodaysFood(res.data.data);
    });
    
  };

  const getCategories = async () => {
    await api.get("http://localhost:8000/categories").then((res) => {
      setCategories(res.data.data);
    });
  };

  const getFlashSale = async () => {
    await api.get("http://localhost:8000/products?isSale=true").then((res) => {
      setFlashSale(res.data.data);
    });
  };
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-3 w-full pt-3 pl-8 pr-8  z-40">
        <div className="flex flex-col fixed  bg-white w-64 rounded-2xl  pl-3 pt-2  pb-5 gap-3  ">
          <span>Thực đơn </span>
          {categories.map((item: any, index: number) => (
            <div
              key={index}
              className="flex flex-col gap-3 cursor-pointer hover:bg-slate-100"
            >
              <div className="flex flex-row items-center gap-1">
                <Image
                  src={item.image}
                  width={30}
                  height={30}
                  alt={item.description}
                />
                <span>{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-12 md:col-span-9 w-full  pt-3 pr-8 gap-3 flex flex-col">
        <ScrollBar items={banneritems}></ScrollBar>
        <ScrollFood items={flashSale} title="Flash Sale"></ScrollFood>
        <ScrollFood items={todaysFood} title="Hôm nay ăn gì"></ScrollFood>
      </div>
    </div>
  );
}
