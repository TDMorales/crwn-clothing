import React  from "react";
import Directory from "../../components/directory/directory.component";
import { categories } from "../../assets/categories";

const Home = () => {
  
  return (
    <Directory categories={categories}/>
  );
} 

export default Home;