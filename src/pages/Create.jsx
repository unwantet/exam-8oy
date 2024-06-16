import React, { useState,useContext } from "react";
import "../static/create.css";
import toast, { Toaster } from "react-hot-toast";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../src/firebase/firebaseConfig";
import { GlobalContext } from "../context/useContextGlobal";


function Create() {
  const { user } = useContext(GlobalContext);
  const [category,setCategory] = useState("")
  const [ingrediend, setIngrediend] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [imgs, setImgs] = useState([]);
  const [ingerediends, setIngrediends] = useState([]);

  const addIngrediend = (e) => {
    e.preventDefault();

    if (ingrediend.trim() !== "") {
      if (!ingerediends.includes(ingrediend)) {
        setIngrediends((prev) => [...prev, ingrediend]);
        toast.success("Ingrediend muvoffaqiyatli qoshildi");
      } else {
        toast.error("Bu ingrediend oldin yozilgan");
      }
      setIngrediend("");
    } else {
      toast.error("Ingrediendni kiriting");
    }
  };

  const addImg = (e) => {
    e.preventDefault();

    if (img.trim() !== "") {
      if (imgs.length < 3) {
        if (!imgs.includes(img)) {
          setImgs((prev) => [...prev, img]);
          toast.success(imgs.length + 1 + " ta img kiritildi");
        } else {
          toast.error("Bu Img oldin yozilgan");
        }
      } else {
        toast.error("Img must be only 3");
      }
      setImg("");
    } else {
      toast.error("Img kiriting");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const price = ingerediends.length * 8;
    console.log(price);
    if (
      name.trim() !== "" &&
      description.trim() !== "" &&
      imgs.length > 0 &&
      cookingTime.trim() !== "" &&
      category.trim() !== "" &&
      ingerediends.length > 0
    ) {
      const newRetsept = {
        name,
        description,
        category,
        img: imgs,
        cockingTime: cookingTime,
        ingrediends: ingerediends,
        price: ingerediends.length * 8,
        uid: user.uid,
      };

      try {
        await addDoc(collection(db, "eda"), newRetsept);
        toast.success("Retsept muvoffaqiyatli yaratildi!");
        window.location.href = "/";
      } catch (error) {
        toast.error("Error adding document: ", error);
      }

    } else {
      toast.error("Iltimos, barcha maydonlarni to'ldiring");
    }
  };

  return (
    <div className="min-h-screen grid place-items-center">
      <div className="max-w-[550px] w-full">
        <h1 className="text-3xl text-center font-bold mt-10">
          Create Your New Fast Food
        </h1>

        <form
          className="flex items-center flex-col gap-1 w-full mt-5"
          onSubmit={handleSubmit}
        >
          <label className="form-control w-full mt-10">
            <div>
              <div className="input1-form">
                <input
                  className="input1 w-full"
                  name="text"
                  type="text"
                  required
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
                <label className="textUser">Name of Fast food</label>
              </div>
            </div>
          </label>

          <label className="form-control w-full mt-5">
            <div className="input1-form">
              <input
                className="input1 w-full"
                name="text"
                type="number"
                required
                onChange={(e) => setCookingTime(e.target.value)}
                value={cookingTime}
              />
              <label className="textUser">Cocking Time</label>
            </div>
          </label>
          <label className="form-control w-full mt-10">
            <div>
              <div className="input1-form">
                <input
                  className="input1 w-full"
                  name="text"
                  type="text"
                  required
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                />
                <label className="textUser">Category of your Food</label>
              </div>
            </div>
          </label>

          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Ingrediends</span>
            </div>
            <div className="input2-container">
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                onChange={(e) => setIngrediend(e.target.value)}
                value={ingrediend}
              />
              <button className="button2" onClick={addIngrediend}>
                Add
              </button>
            </div>
            <div className="mt-1 ">
              <p className="opacity-70">
                Ingrediendlar:{" "}
                {ingerediends.map((ing) => (
                  <span key={ing} className="badge badge-outline">
                    {ing}
                  </span>
                ))}
              </p>
            </div>
          </label>
          <Toaster />

          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Images</span>
            </div>
            <div className="input2-container">
              <input
                type="text"
                placeholder="Add Img Urls"
                className="input input-bordered w-full"
                onChange={(e) => setImg(e.target.value)}
                value={img}
              />
              <button className="button2" onClick={addImg}>
                Add
              </button>
            </div>
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Description</span>
            </div>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="Write Description"
              required
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            ></textarea>
          </label>

          <button className="btn btn-neutral w-full my-6">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Create;
