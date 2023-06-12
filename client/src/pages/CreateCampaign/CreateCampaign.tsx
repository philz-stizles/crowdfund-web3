import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { Button, FormField, Loader } from "../../components";
import { useCampaignContext } from "../../context/CampaignContext";
import { useNavigate } from "react-router";
import { money } from "../../assets";
import { checkIfImageUrlIsValid } from "../../utils";

const CreateCampaign = () => {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useCampaignContext();
  const navigate = useNavigate();

  const submitHandler = useCallback(async (e: FormEvent) => {
    console.log("submit: ", formData);
    e.preventDefault();
    try {
      // checkIfImageUrlIsValid(formData.image, async (url, isValid) => {
      //   console.log("Callback: ", url, isValid);
      //   console.log("Go");
      // });
      // if (isValid) {
      setIsLoading(true);
      await createCampaign(formData);
      setIsLoading(false);
      navigate("/");
      // } else {
      //   alert("Provide valid image URL");
      //   setFormData((prevState) => ({ ...prevState, image: "" }));
      //   setIsLoading(false);
      // }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, []);

  const changeHandler = useCallback(
    (
      name: string,
      e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
    ) => {
      console.log(name, e.target.value);
      setFormData((prevState) => {
        return { ...prevState, [name]: e.target.value };
      });
    },
    []
  );
  // wh
  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Start a Campaign
        </h1>
      </div>
      <form
        onSubmit={submitHandler}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            label="Your Name *"
            placeholder="John Doe"
            type="text"
            value={formData.name}
            onChange={changeHandler.bind(this, "name")}
          />
          <FormField
            label="Campaign Title *"
            placeholder="Write a title"
            type="text"
            value={formData.title}
            onChange={changeHandler.bind(this, "title")}
          />
        </div>

        <FormField
          label="Story *"
          placeholder="Write your story"
          isTextArea
          value={formData.description}
          onChange={changeHandler.bind(this, "description")}
        />

        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <img
            src={money}
            alt="money"
            className="w-[40px] h-[40px] object-contain"
          />
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">
            You will get 100% of the raised amount
          </h4>
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            label="Goal *"
            placeholder="ETH 0.50"
            type="text"
            value={formData.target}
            onChange={changeHandler.bind(this, "target")}
          />
          <FormField
            label="End Date *"
            placeholder="End Date"
            type="date"
            value={formData.deadline}
            onChange={changeHandler.bind(this, "deadline")}
          />
        </div>

        <FormField
          label="Campaign image *"
          placeholder="Place image URL of your campaign"
          type="url"
          value={formData.image}
          onChange={changeHandler.bind(this, "image")}
        />

        <div className="flex justify-center items-center mt-[40px]">
          <Button
            type="submit"
            title="Submit new campaign"
            className="bg-[#1dc071]"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
