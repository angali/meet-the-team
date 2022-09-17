/* This component displays the user information */
import React from "react";
import Image from "next/image";
import { IUser } from "../models/user";
import { callIcon, emailIcon } from "./svgIcons";

interface IProps {
  index: number;
  isSmallScreen: boolean;
  view: "grid" | "list";
  user: IUser;
}

const User: React.FC<IProps> = ({
  user,
  view = "grid",
  isSmallScreen = false,
  index = 0
}) => {
  // Show the user list as Grid view
  const gridMode = () => (
    <div className={`grid-item-container grid-item-background-${index % 5}`}>
      <div className="grid-item-header">
        <h2>{user.name.first}</h2>
      </div>
      <div className="grid-item-body">
        {/* Image of the user */}
        <div className="grid-item-avatar">
          {/* Due limitation of Image component we need to pass fixed value of image size */}
          {/* The component uses fixed values to resize and lazyload the image */}
          <Image
            src={`${isSmallScreen ? user.picture.medium : user.picture.large}`}
            alt={user.name.first}
            title={user.name.first}
            width={`${isSmallScreen ? "80px" : "100px"}`}
            height={`${isSmallScreen ? "80px" : "100px"}`}
          />
        </div>
      </div>
      {/* Footer of the card that shows city, email and phone/mobile( cell ) */}
      <div className="grid-item-footer">
        <div className="grid-item-city">{user.location.city}</div>

        {/* Shows city, email and phone/mobile (cell) */}
        <div className="grid-item-contact">
          {user.email && (
            <a href={`mailto:${user.email}`}>
              {emailIcon(isSmallScreen ? 14 : 21, isSmallScreen ? 14 : 21)}
            </a>
          )}

          {(user.phone || user.cell) && (
            <a href={`tel:${user.phone || user.cell}`}>
              {callIcon(isSmallScreen ? 14 : 21, isSmallScreen ? 14 : 21)}
            </a>
          )}
        </div>
      </div>
    </div>
  );

  // show the user list as List view
  const listMode = () => (
    <div className={`list-item-container list-item-background-${index % 5}`}>
      {/* Image of the user */}
      <div className="list-item-avatar">
        <Image
          src={user.picture.large}
          alt={user.name.first}
          title={user.name.first}
          width="80px"
          height="80px"
        />
      </div>

      <div className="list-item-right-section">
        {/* First name of the user */}
        <div className="list-item-info">
          <h2>{user.name.first}</h2>
          <div className="list-item-city">{user.location.city}</div>
        </div>

        {/* Contact information of the user (email, phone/cell) */}
        <div className="list-item-contact">
          {user.email && <a href={`mailto:${user.email}`}>{emailIcon()}</a>}

          {(user.phone || user.cell) && (
            <a href={`tel:${user.phone || user.cell}`}>{callIcon()}</a>
          )}
        </div>
      </div>
    </div>
  );

  return view === "grid" ? gridMode() : listMode();
};

export default React.memo(User);
