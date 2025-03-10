"use client";

import React from "react";
import SocialButton from "./social-button";
import { socialsLinks } from "@/app/data";

const Socials: React.FC = () => {
  return (
    <div className="hidden md:flex items-center gap-4">
      {socialsLinks.map((social) => (
        <SocialButton key={social.id} social={social} />
      ))}
    </div>
  );
};

export default Socials; 