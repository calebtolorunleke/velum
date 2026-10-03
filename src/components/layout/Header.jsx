import { useApp } from "@/context/AppContext";
import React from "react";

const Header = ({ onMobileMenuTOggle }) => {
  const { user, logout, searchQuery, setsearchQuerry, sortBy, setSortBy } =
    useApp();

  return <header className=""></header>;
};

export default Header;
