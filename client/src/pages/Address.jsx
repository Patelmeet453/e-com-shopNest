import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });

  const submitHandler = () => {
    localStorage.setItem("address", JSON.stringify(form));
    navigate("/checkout");
  };

  return (
    <div className="max-w-xl mx-auto p-6 text-white">
      <h2 className="text-2xl mb-6">Shipping Address</h2>

      {Object.keys(form).map((key) => (
        <input
          key={key}
          placeholder={key}
          className="w-full mb-3 p-3 rounded bg-gray-800"
          onChange={(e) =>
            setForm({ ...form, [key]: e.target.value })
          }
        />
      ))}

      <button
        onClick={submitHandler}
        className="w-full mt-4 bg-emerald-600 py-3 rounded-xl"
      >
        Continue to Payment
      </button>
    </div>
  );
};

export default Address;
