import React, { useState, useEffect } from "react";
import Input from "../DocumentVerification/InputComponent/Input.jsx";
import InputUpload from "../DocumentVerification/Inputupload/InputUpload.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import logo from "../../Images/logo.svg";

const TeacherDocument = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const { Data } = useParams();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`https://test-env-0xqt.onrender.com/api/teacher/TeacherDocument/${Data}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const user = await response.json();
        setData(user.data);
      } catch (error) {
        setError(error.message);
      }
    };

    getData();
  }, []);

  const [formData, setFormData] = useState({
    Phone: data.Phone || "",
    Address: data.Address || "",
    Experience: data.Experience || "",
    SecondarySchool: data.SecondarySchool || "",
    SecondaryMarks: data.SecondaryMarks || "",
    HigherSchool: data.HigherSchool || "",
    HigherMarks: data.HigherMarks || "",
    UGcollege: data.UGcollege || "",
    UGmarks: data.UGmarks || "",
    PGcollege: data.PGcollege || "",
    PGmarks: data.PGmarks || "",
    Aadhaar: null,
    Secondary: null,
    Higher: null,
    UG: null,
    PG: null,
  });

  const handleFileChange = (fileType, e) => {
    setFormData({
      ...formData,
      [fileType]: e.target.files[0],
    });
  };

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    setError("");

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error("No access token found");
      }

      // Only send form fields, skip files for now
      const payload = {
        Phone: formData.Phone,
        Address: formData.Address,
        Experience: formData.Experience,
        SecondarySchool: formData.SecondarySchool,
        HigherSchool: formData.HigherSchool,
        UGcollege: formData.UGcollege,
        PGcollege: formData.PGcollege,
        SecondaryMarks: formData.SecondaryMarks,
        HigherMarks: formData.HigherMarks,
        UGmarks: formData.UGmarks,
        PGmarks: formData.PGmarks
      };

      const response = await fetch(`https://test-env-0xqt.onrender.com/api/teacher/verification/${Data}`, {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to submit form");
      }

      console.log("Form submitted successfully!", responseData);
      navigate("/pending");
    } catch (error) {
      console.error("Submit error:", error);
      setError(error.message || "Failed to submit form");
      if (error.message.includes("token")) {
        navigate('/login');
      }
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      {loader && (
        <div className="absolute top-[40%] left-[45%] translate-x-[50%] translate-y-[50%]">
          <RotatingLines
            visible={true}
            height="100"
            width="100"
            color="#0D286F"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />{" "}
          <span className="text-white text-xl ml-1">Uploading ...</span>
        </div>
      )}
      <div className="flex items-center gap-[20rem] px-32 py-2 bg-[#0D286F]">
        <div className="flex items-center gap-3">
          <img src={logo} className="w-14" alt="" />
          <h1 className="text-2xl text-[#4E84C1] font-bold">Edify</h1>
        </div>
        <h2 className="text-white text-xl">Document Verification (Teacher) </h2>
      </div>
      <hr />
      <form onSubmit={handleSubmit}>
        <p className="text-[#4E84C1] p-5 px-10">Personal Information</p>
        <div className="flex flex-wrap gap-20 px-36 mb-10">
          <Input
            label={"First Name"}
            placeholder={"First Name"}
            value={data.Firstname}
            readonly
          />
          <Input
            label={"Last Name"}
            placeholder={"Last Name"}
            value={data.Lastname}
            readonly
          />
          <Input
            label={"Phone No."}
            placeholder={"Phone No."}
            value={formData.Phone}
            onChange={(e) => handleInputChange("Phone", e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-20 px-36">
          <Input
            label={"Home Address"}
            placeholder={"Home Address"}
            value={formData.Address}
            onChange={(e) => handleInputChange("Address", e.target.value)}
          />
          <Input
            label={"Experience (years)"}
            placeholder={"Experience (years)"}
            value={formData.Experience}
            onChange={(e) => handleInputChange("Experience", e.target.value)}
          />
          <InputUpload
            label={"Upload Aadhar Card"}
            placeholder={"Upload Aadhar Card"}
            value={formData.Aadhaar}
            onChange={(e) => handleFileChange("Aadhaar", e)}
          />
        </div>

        <p className="text-[#4E84C1] p-5 px-10 pt-10">
          Educational Information
        </p>
        <div className="border h-full mx-36 relative">
          <div className="flex flex-row gap-7 ">
            <div className=" bg-[#0D286F] p-[1rem] m-3 rounded-sm">
              <p className=" text-white text-sm">Secondary</p>
            </div>
            <Input
              placeholder={"10th Board Name"}
              value={formData.SecondarySchool}
              onChange={(e) =>
                handleInputChange("SecondarySchool", e.target.value)
              }
            />
            <Input
              placeholder={"Total Marks (%)"}
              value={formData.SecondaryMarks}
              onChange={(e) =>
                handleInputChange("SecondaryMarks", e.target.value)
              }
            />
            <div className=" mt-[-1.5rem]">
              <InputUpload
                placeholder={"Upload 10th Result"}
                value={formData.Secondary}
                onChange={(e) => handleFileChange("Secondary", e)}
              />
            </div>
          </div>
          <hr />

          <div className="flex flex-row gap-7 items-center">
            <div className=" bg-[#0D286F] p-[1rem] m-1 rounded-sm">
              <p className=" text-white text-sm">Higher Secondary</p>
            </div>
            <Input
              placeholder={"12th Board Name"}
              value={formData.HigherSchool}
              onChange={(e) =>
                handleInputChange("HigherSchool", e.target.value)
              }
            />
            <Input
              placeholder={"Total Marks (%)"}
              value={formData.HigherMarks}
              onChange={(e) => handleInputChange("HigherMarks", e.target.value)}
            />
            <div className=" mt-[-1.5rem]">
              <InputUpload
                placeholder={"Upload 12th Result"}
                value={formData.Higher}
                onChange={(e) => handleFileChange("Higher", e)}
              />
            </div>
          </div>
          <hr />

            <div className="flex flex-row gap-7">
              <div className=" bg-[#0D286F] p-[1rem] m-3 rounded-sm">
                <p className=" text-white text-sm">Graduation</p>
              </div>
              <Input
                placeholder={"Graduation University Name"}
                value={formData.UGcollege}
                onChange={(e) => handleInputChange("UGcollege", e.target.value)}
              />
              <Input
                placeholder={"UGmarks/SGP out of 10"}
                value={formData.UGmarks}
                onChange={(e) => handleInputChange("UGmarks", e.target.value)}
              />
              <div className=" mt-[-1.5rem]">
                <InputUpload
                  placeholder={"Upload Graduation .."}
                  value={formData.UG}
                  onChange={(e) => handleFileChange("UG", e)}
                />
              </div>
            </div>
          
          <hr />
            <div className="flex flex-row gap-7">
              <div className=" bg-[#0D286F] p-[1rem] m-1 rounded-sm px-4">
                <p className=" text-white text-sm">Post Graduation</p>
              </div>
              <Input
                placeholder={"P.G. University Name"}
                value={formData.PGcollege}
                onChange={(e) => handleInputChange("PGcollege", e.target.value)}
              />
              <Input
                placeholder={"CGPA out of 10"}
                value={formData.PGmarks}
                onChange={(e) => handleInputChange("PGmarks", e.target.value)}
              />
              <div className=" mt-[-1.5rem]">
                <InputUpload
                  placeholder={"Upload P.G. Result"}
                  value={formData.PG}
                  onChange={(e) => handleFileChange("PG", e)}
                />
              </div>
            </div>
        </div>

        {error && <p className=" text-white text-xl m-5 text-center">!! {error}</p>}
        <div className=" bg-[#0D286F] p-3 m-6 rounded-md w-[7rem] ml-[85%] cursor-pointer">
          <button className=" text-white text-sm" type="submit">
            Submit ▶️
          </button>
        </div>
      </form>
    </>
  );
};

export default TeacherDocument;
