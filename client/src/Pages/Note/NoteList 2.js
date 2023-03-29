import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as style from "./styles";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import FloatingButton from "../../Components/Button/FloatingButton";
import SearchBox from "../../Components/SearchBox/SearchBox";
import NoteItem from "../../Components/NoteItem/NoteItem";

export default function NoteList() {
  const nickName = sessionStorage.getItem("nickName");
  const title = "특이사항 목록";
  const navigate = useNavigate();
  const [adata, setData] = useState([]);
  useEffect(() => {
    const url = `http://localhost:8080/significant/tutorSendingList/${nickName}`;
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [nickName]);

  const objArray = adata.map((item) => ({
    id: item.significantId,
    src: item.guardianProfileUrl,
    seniorName: item.seniorName,
    guardianName: item.guardianName,
    className: item.lectureName,
    date: item.createDate.substr(0, 10),
    title: item.title,
    content: item.content,
  }));

  const obj = {
    data: objArray,
  };

  const onClickItem = (item) => {
    console.log(item.id);
    navigate("/noteDetail", {
      state: {
        key: item.id,
        src: item.src,
        guardianName: item.guardianName,
        className: item.className,
        date: item.date,
        title: item.title,
        seniorName: item.seniorName,
      },
    });
  };

  return (
    <div>
      <Header title={title} />
      <FloatingButton />
      <style.Wrap>
        <SearchBox color={"#FF7F00"} />
      </style.Wrap>
      {obj.data.map((item) => {
        return (
          <NoteItem
            key={item.id}
            src={item.src}
            guardianName={item.guardianName}
            className={item.className}
            date={item.date}
            title={item.title}
            onClick={() => {
              navigate("/noteDetail", {
                state: {
                  key: item.id,
                  src: item.src,
                  guardianName: item.guardianName,
                  className: item.className,
                  date: item.date,
                  title: item.title,
                  seniorName: item.seniorName,
                  content: item.content,
                },
              });
            }}
          />
        );
      })}
      <Footer title={title} />
    </div>
  );
}