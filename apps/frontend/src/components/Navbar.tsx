"use client";

export default function Navbar() {
  return (
    <nav className="h-[10%] bg-[#272727] p-4 flex items-center justify-between px-8">
      <h1 className=" text-white text-3xl font-bold">CaseFlow</h1>
      <div className="flex items-center">
        <button className="text-white cursor-pointer">Login</button>
        <button className="ml-4 text-white cursor-pointer">Sign Up</button>
      </div>
    </nav>
  );
}
