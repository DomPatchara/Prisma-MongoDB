"use client";

import React from "react";
import Modal from "./Modal";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export interface InputData {
  title: string;
  description: string;
}

const AddTabs = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [inputs, setInputs] = useState<InputData>({
    title: "",
    description: "",
  });

  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(inputs);

    // submit --- POST data to database ( MongoDB )
    axios
      .post("/api/tabs", inputs)
      .then((res) => {
        console.log("Post created :", res.data);
      })
      .catch((err) => {
        console.error("Error create post :", err);
      })
      .finally(() => {
        setInputs({title: "", description: ""});
        setOpenModal(false);
        router.refresh();
      });
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;  // ดึง name & value จากแต่ละ input
    setInputs((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div>
      <button
        onClick={() => setOpenModal(true)}
        className="bg-blue-700 text-white px-4 py-2 rounded-2xl cursor-pointer hover:bg-blue-800"
      >
        Add New Tab
      </button>

      <Modal openModal={openModal} setOpenModal={setOpenModal}>
        <form className="w-full" onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold text-center pb-3">Add New Tabs</h1>
          <input
            type="text"
            placeholder="Title"
            name="title"
            className="w-full py-2 px-4 bg-blue-400 rounded-xl outline-none"
            value={inputs.title || ""}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Description"
            name="description"
            className="w-full py-2 px-4 bg-blue-400 rounded-xl my-5"
            value={inputs.description || ""}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-blue-700 text-white px-5 py-2 rounded-2xl hover:bg-blue-600 cursor-pointer"
          >
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AddTabs;
