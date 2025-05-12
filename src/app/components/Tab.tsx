"use client";

import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import Modal from "./Modal";
import axios from "axios";
import { useRouter } from "next/navigation";
import { InputData } from "./AddTabs";

export interface TabItem {
  id: string;
  title: string;
  description: string;
}

interface TabProps {
  tab: TabItem;
}

const Tab = ({ tab }: TabProps) => {
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [newEdit, setNewEdit] = useState<InputData>(tab);

  const router = useRouter(); //  use for refresh page

  // PATCH new data to database ( MongoDB )
  const handleSubmitEdit = (e: any) => {
    e.preventDefault();

    axios
      .patch(`/api/tabs/${tab.id}`, newEdit)
      .then((res) => {
        console.log("Post created :", res.data);
      })
      .catch((err) => {
        console.error("Error create post :", err);
      })
      .finally(() => {
        setOpenModalEdit(false);
        router.refresh();
      });
  };

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewEdit((prevState) => ({ ...prevState, [name]: value }));
  };

  // DELLET --- delete data from database ( MongoDB )
  const handleDeletePost = (id: string) => {
    axios
      .delete(`/api/tabs/${id}`)
      .then((res) => {
        console.log("Delete data:", res.data);
      })
      .catch((err) => {
        console.error("Error delete post :", err);
      })
      .finally(() => {
        setOpenModalDelete(false);
        router.refresh();
      });
  };

  return (
    <div className="p-3 my-5 bg-gray-500 rounded-xl">
      <div className="flex justify-between items-center px-3">
        {/** Infomation */}
        <div>
          <h1 className="text-2xl font-bold">{tab.title}</h1>
          <p>{tab.description}</p>
        </div>

        {/** Edit + Delete */}
        <div className="space-x-2">
          
          {/**Edit */}
          <button onClick={() => setOpenModalEdit(true)}>
            <MdEdit size={25} className="hover:text-blue-500 cursor-pointer" />
          </button>

          <Modal openModal={openModalEdit} setOpenModal={setOpenModalEdit}>
            <form className="w-full" onSubmit={handleSubmitEdit}>
              <h1 className="text-2xl font-bold text-center pb-8">
                Edits New Tabs Infomations
              </h1>
              <input
                type="text"
                placeholder="Title"
                name="title"
                className="w-full py-2 px-4 bg-blue-400 rounded-xl outline-none"
                value={newEdit.title || ""}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Description"
                name="description"
                className="w-full py-2 px-4 bg-blue-400 rounded-xl my-5"
                value={newEdit.description || ""}
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

          {/**Delete */}
          <button onClick={() => setOpenModalDelete(true)}>
            <MdDelete size={25} className="hover:text-red-500 cursor-pointer" />
          </button>

          <Modal openModal={openModalDelete} setOpenModal={setOpenModalDelete}>
            <h1 className="text-2xl pb-3 text-center font-semibold">
              Are You Sure, You want to delete this post ?
            </h1>
            <form className="w-full flex items-center justify-center mt-4">
              <button
                onClick={() => handleDeletePost(tab.id)}
                className="text-blue-700 font-bold mr-5 px-4 py-2 bg-blue-400 rounded-xl hover:bg-blue-500 cursor-pointer"
              >
                YES
              </button>
              <button
                onClick={() => setOpenModalDelete(false)}
                className="text-red-700 font-bold mr-5 px-4 py-2 bg-red-400 rounded-xl hover:bg-red-500 cursor-pointer"
              >
                NO
              </button>
            </form>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Tab;
