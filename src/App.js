import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './hooks/AuthContext';
import { ExpenseProvider } from './context/ExpenseContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Dashboard from './pages/Dashboard';
import AddExpense from './pages/AddExpense';
import ExpenseListPage from './pages/ExpenseListPage';
import Statistics from './pages/Statistics';
import SignIn from './components/Layout/SignIn';
import SignUp from './components/Layout/SignUp';

const LayoutWithHeaderFooter = ({ children }) => (
  <>
    <Header />
    <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {children}
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <AuthProvider>
      <ExpenseProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Routes>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/"
                element={
                  <LayoutWithHeaderFooter>
                    <Dashboard />
                  </LayoutWithHeaderFooter>
                }
              />
              <Route
                path="/add"
                element={
                  <LayoutWithHeaderFooter>
                    <AddExpense />
                  </LayoutWithHeaderFooter>
                }
              />
              <Route
                path="/expenses"
                element={
                  <LayoutWithHeaderFooter>
                    <ExpenseListPage />
                  </LayoutWithHeaderFooter>
                }
              />
              <Route
                path="/statistics"
                element={
                  <LayoutWithHeaderFooter>
                    <Statistics />
                  </LayoutWithHeaderFooter>
                }
              />
            </Routes>
          </div>
        </Router>
      </ExpenseProvider>
    </AuthProvider>
  );
}

export default App;