import { Buffer } from 'buffer';
global.Buffer = Buffer; // very important
import React from "react";
import IndexJs from "./src/index";

export default function App() {
  return <IndexJs />;
}
