import { FC } from "react";
import SocialButton from "./social-button";
import { socialsLinks } from "@/app/data";
 interface SocialsProps {
  hiddenOnMobile?: boolean;
  size?: number;
 }

const Socials: FC<SocialsProps> = ({hiddenOnMobile, size}) => {
  return (
    <div className={`${hiddenOnMobile ? 'hidden md:flex' : 'flex'} items-center gap-2 `}>
      {socialsLinks.map((social) => (
        <SocialButton key={social.id} social={social} size={size} />
      ))}
    </div>
  );
};

export default Socials; 