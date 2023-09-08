"use client";

import { Label } from "../client/Label";
import { Input } from "../client/Input";
import { Textarea } from "../client/Textarea";
import { Switch } from "../client/Switch";
import { useState } from "react";
import axios from "axios";

export const ContactTemplate = () => {
  const [formState, setFormState] = useState({});
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleValue = (id: any, value: any) => {
    setFormState((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    setIsLoading(true);
    axios
      .post("/api/mailSender", {
        ...formState,
      })
      .then((data) => {
        console.log(data);
        setResponse(data.data.message);
        setIsLoading(false);
      });
  };

  return (
    <div className="flex w-full justify-center">
      <div className="flex max-w-[600px] flex-grow flex-col">
        <div className="flex flex-col">
          <h1 className="flex w-full justify-center text-xl font-bold">
            Contact us
          </h1>
          <p className="m-auto block w-full max-w-[400px] text-center text-base">
            Have a topic to discuss? Fill form below or email{" "}
            <a className="italic" href="mailto:contact@sync.art">
              contact@sync.art
            </a>
          </p>
        </div>
        <div className="mt-3 flex flex-col">
          <div className="flex w-full flex-col md:flex-row md:gap-3">
            <div className="flex flex-grow flex-col">
              <Label text="First name" id="first_name" />
              <Input id="first_name" handleValue={handleValue} />
            </div>
            <div className="flex flex-grow flex-col">
              <Label text="Second name" id="second_name" />
              <Input id="second_name" handleValue={handleValue} />
            </div>
          </div>
          <div className="flex flex-col">
            <Label text="Company /artist name (optional)" id="company" />
            <Input id="company" handleValue={handleValue} />
          </div>
          <div className="flex flex-col">
            <Label text="Email" id="email" />
            <Input id="email" handleValue={handleValue} />
          </div>
          <div className="flex flex-col">
            <Label text="Phone number" id="phone_number" />
            <Input id="phone_number" handleValue={handleValue} />
          </div>
          <div className="flex flex-col">
            <Label text="Message" id="message" />
            <Textarea
              id="message"
              name="message"
              placeholder=""
              handleValue={handleValue}
            />
          </div>
        </div>
        <div className="my-2 flex items-center text-xxs">
          <Switch id="privacy_policy" handleValue={handleValue} />{" "}
          <p className="ml-2">
            By selecting this, you agree to our{" "}
            <a className="font-bold" href="/privacy-policy">
              privacy policy
            </a>
            .
          </p>
        </div>
        <div className="my-2 flex items-center text-xxs">
          <button
            onClick={handleSubmit}
            className="flex w-full flex-grow-0 justify-center rounded-md bg-brandDark px-3 py-2 text-xxs font-bold text-white hover:bg-brandDarkHover disabled:cursor-not-allowed"
          >
            {isLoading ? "Please wait..." : "Lets talk"}
          </button>
        </div>
        <div className="flex w-full">{response}</div>
      </div>
    </div>
  );
};
