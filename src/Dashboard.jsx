import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import axios from "axios";
import CategoryMenu from "./CategoryMenu";
import QuestionsList from "./QuestionsList";
import LogoutButton from "./LogoutButton";

const Dashboard = ({ username }) => {
  const [categories, setCategories] = useState([]);
  const [questionsByCategory, setQuestionsByCategory] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Function to fetch categories from API
  const fetchCategories = () => {
    axios
      .get("/api/categories")
      .then((response) => {
        setCategories(response.data); // Assuming response.data is an array of categories
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  // Function to handle category selection
  const handleCategorySelect = (categoryId) => {
    axios
      .get(`/api/questions/${categoryId}`)
      .then((response) => {
        setQuestionsByCategory({
          ...questionsByCategory,
          [categoryId]: response.data,
        });
        setSelectedCategory(categoryId);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  };

  // Function to handle logout
  const handleLogout = () => {
    axios
      .post("/api/logout")
      .then((response) => {
        // Handle successful logout
        window.localStorage.removeItem("authToken"); // Remove authToken from localStorage
        window.location.href = "/login"; // Redirect to login page
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <>
      <Nav />
      <main className="dashboard">
        <h1 className="dashboardTitle">Your App Title</h1>
        <p>Welcome, {username}!</p>
        <LogoutButton onLogout={handleLogout} />
        <div className="dashboardContent">
          <CategoryMenu
            categories={categories}
            onSelectCategory={handleCategorySelect}
          />
          <div className="questionsList">
            {selectedCategory !== null ? (
              <QuestionsList
                questions={questionsByCategory[selectedCategory]}
              />
            ) : (
              <p className="selectCategoryMessage">
                Select a Category to view its questions
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
