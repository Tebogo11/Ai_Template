import React from "react";

interface Outfit {
  _id: string;
  // Add other outfit properties as needed
}

interface HeaderProps {
  outfit?: Outfit | undefined;
  outfits: Outfit[] | undefined;
}

const Header = ({ outfit, outfits }: HeaderProps) => {
  return (
    <div className="flex flex-1 justify-between w-full">
      <div>
        <h2 className="form-label h-5">Preview</h2>
      </div>
      {outfits && outfits?.length !== 0 && (
        <Header outfit={outfit} outfits={outfits} />
      )}
    </div>
  );
};

export default Header;
