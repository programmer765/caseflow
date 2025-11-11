"use client";

export default function Navbar() {
  return (
    <nav className="h-[10%] bg-[#272727] p-4 flex items-center justify-between px-8">
      <h1 className=" text-white text-3xl font-bold">CaseFlow</h1>
      <div className="flex items-center">
        <button className="px-3 py-1.5 bg-[#0e0e0e] text-white font-semibold rounded cursor-pointer border border-[#0e0e0e] hover:bg-[#1e1e1e]">Login</button>
        <button className="ml-4 px-2.5 py-1 bg-gray-200 text-black font-semibold rounded cursor-pointer border border-gray-200 hover:bg-white/80">Sign Up</button>
      </div>
    </nav>
  );
}
