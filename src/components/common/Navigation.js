import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useMatch } from "react-router-dom";
import { userLoggedOut } from "../../features/auth/authSlice";
import { getSearchKeyword } from "../../features/search/searchSlice";
import logo from "../../images/logo.png";
import { url } from "gravatar";

const Navigation = () => {
  const projects = useMatch("/projects");
  const teams = useMatch("/teams");

  const { user } = useSelector((state) => state.auth) || {};
  const { name, email } = user || {};
  const dispatch = useDispatch();

  const debounceHandler = (fn, delay) => {
    let timeoutId;
    return (...arg) => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        fn(...arg);
      }, delay);
    };
  };

  const doSearch = (value) => {
    dispatch(getSearchKeyword(value));
  };

  const handleSearch = debounceHandler(doSearch, 500);

  const handleLogout = () => {
    dispatch(userLoggedOut());
    localStorage.clear();
  };

  return (
    <div className="flex items-center justify-between py-3 px-10 bg-white bg-opacity-75">
      <div className="flex items-center">
      <svg
              width="45"
              height="45"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto"
            >
              <path
                d="M50 98C76.5097 98 98 76.5097 98 50C98 23.4903 76.5097 2 50 2C23.4903 2 2 23.4903 2 50C2 76.5097 23.4903 98 50 98Z"
                fill="#17271B"
              ></path>
              <path
                d="M50 100C40.111 100 30.444 97.0676 22.2215 91.5735C13.9991 86.0794 7.59043 78.2705 3.80605 69.1342C0.0216641 59.9979 -0.968503 49.9445 0.960759 40.2455C2.89002 30.5464 7.65206 21.6373 14.6447 14.6447C21.6373 7.65204 30.5465 2.89 40.2455 0.960736C49.9446 -0.968525 59.9979 0.0216413 69.1342 3.80602C78.2705 7.5904 86.0794 13.999 91.5735 22.2215C97.0676 30.4439 100 40.1109 100 50C99.9841 63.256 94.7112 75.9644 85.3378 85.3378C75.9644 94.7112 63.256 99.9841 50 100ZM50 4C40.9021 4 32.0085 6.69785 24.4438 11.7524C16.8791 16.8069 10.9832 23.9912 7.50156 32.3966C4.01993 40.802 3.10898 50.051 4.8839 58.9742C6.65882 67.8973 11.0399 76.0937 17.4731 82.5269C23.9063 88.9601 32.1027 93.3412 41.0259 95.1161C49.949 96.891 59.1981 95.9801 67.6035 92.4985C76.0089 89.0168 83.1931 83.1209 88.2476 75.5562C93.3022 67.9916 96 59.0979 96 50C95.9841 37.8049 91.1326 26.1139 82.5094 17.4906C73.8862 8.86739 62.1951 4.01588 50 4Z"
                fill="#11FAA2"
              ></path>
              <path
                d="M38.1729 53.7505L37.8832 54.0406C37.7349 54.1891 37.7351 54.4297 37.8836 54.578L42.2353 58.9237C42.3838 59.072 42.6244 59.0718 42.7727 58.9233L43.0624 58.6332C43.2107 58.4847 43.2106 58.2441 43.0621 58.0958L38.7103 53.7501C38.5618 53.6018 38.3212 53.602 38.1729 53.7505Z"
                fill="white"
              ></path>
              <path
                d="M38.2681 51.518L37.9782 51.808C37.8298 51.9564 37.8298 52.197 37.9782 52.3454L41.5703 55.9375C41.7187 56.0859 41.9593 56.0859 42.1077 55.9375L42.3977 55.6475C42.5461 55.4991 42.5461 55.2585 42.3977 55.1101L38.8055 51.518C38.6571 51.3696 38.4165 51.3696 38.2681 51.518Z"
                fill="white"
              ></path>
              <path
                d="M62.7515 53.7618L62.4617 54.052C62.3135 54.2005 62.3136 54.4411 62.4621 54.5894L66.8139 58.935C66.9624 59.0833 67.203 59.0832 67.3513 58.9347L67.641 58.6445C67.7893 58.496 67.7891 58.2554 67.6406 58.1071L63.2889 53.7615C63.1404 53.6132 62.8998 53.6133 62.7515 53.7618Z"
                fill="white"
              ></path>
              <path
                d="M62.8163 51.52L62.5261 51.8097C62.3776 51.9579 62.3774 52.1985 62.5257 52.3471L66.1146 55.9423C66.2629 56.0908 66.5035 56.091 66.652 55.9428L66.9422 55.6531C67.0907 55.5048 67.0909 55.2642 66.9427 55.1157L63.3537 51.5205C63.2054 51.3719 62.9648 51.3717 62.8163 51.52Z"
                fill="white"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M73 56.45H72C71.7162 54.0824 70.5816 51.8986 68.8073 50.3055C67.0331 48.7124 64.7402 47.8185 62.3558 47.7904C59.9714 47.7622 57.6581 48.6018 55.8468 50.1526C54.0354 51.7034 52.8495 53.8597 52.51 56.22C51.98 56.34 49.91 56.45 49.91 56.45C49.91 56.45 47.91 56.35 47.42 56.24C47.0827 53.8796 45.8989 51.7222 44.0892 50.1697C42.2795 48.6172 39.9672 47.7754 37.5829 47.8011C35.1987 47.8268 32.905 48.7182 31.1292 50.3094C29.3533 51.9005 28.2163 54.0829 27.93 56.45H26.81C26.6084 56.45 26.4151 56.5301 26.2726 56.6726C26.1301 56.8151 26.05 57.0084 26.05 57.21V58C26.0526 58.1981 26.1324 58.3874 26.2725 58.5275C26.4126 58.6676 26.6019 58.7474 26.8 58.75H27.88C28.1611 61.1181 29.2935 63.3032 31.0661 64.8984C32.8388 66.4935 35.1309 67.3899 37.5154 67.4205C39.8999 67.451 42.2142 66.6138 44.0272 65.0646C45.8402 63.5155 47.0282 61.3601 47.37 59C47.92 58.89 49.86 58.78 49.86 58.78C49.86 58.78 51.92 58.91 52.46 59.02C52.7538 61.4225 53.9236 63.6321 55.7454 65.2256C57.5672 66.8191 59.9128 67.6846 62.333 67.6561C64.7532 67.6276 67.0778 66.7072 68.8616 65.0712C70.6453 63.4353 71.7628 61.1987 72 58.79H73C73.1981 58.7901 73.3885 58.7127 73.5304 58.5745C73.6724 58.4363 73.7548 58.2481 73.76 58.05V57.22C73.76 57.0184 73.6799 56.8251 73.5374 56.6826C73.3949 56.5401 73.2016 56.46 73 56.46V56.45ZM37.64 65.11C36.1586 65.11 34.7105 64.6707 33.4788 63.8477C32.247 63.0247 31.287 61.8549 30.7201 60.4863C30.1532 59.1177 30.0049 57.6117 30.2939 56.1588C30.5829 54.7059 31.2963 53.3713 32.3438 52.3238C33.3913 51.2763 34.7258 50.5629 36.1788 50.2739C37.6317 49.9849 39.1377 50.1332 40.5063 50.7001C41.8749 51.267 43.0447 52.227 43.8677 53.4588C44.6907 54.6905 45.13 56.1386 45.13 57.62C45.13 59.6065 44.3409 61.5116 42.9362 62.9162C41.5316 64.3209 39.6265 65.11 37.64 65.11ZM62.19 65.11C60.7086 65.11 59.2605 64.6707 58.0288 63.8477C56.797 63.0247 55.837 61.8549 55.2701 60.4863C54.7032 59.1177 54.5549 57.6117 54.8439 56.1588C55.1329 54.7059 55.8463 53.3713 56.8938 52.3238C57.9413 51.2763 59.2758 50.5629 60.7288 50.2739C62.1817 49.9849 63.6877 50.1332 65.0563 50.7001C66.4249 51.267 67.5947 52.227 68.4177 53.4588C69.2407 54.6905 69.68 56.1386 69.68 57.62C69.68 59.6065 68.8909 61.5116 67.4862 62.9162C66.0816 64.3209 64.1765 65.11 62.19 65.11Z"
                fill="white"
              ></path>
              <path
                d="M81.58 53.62V36.13H75.43C75.7897 34.2076 76.0202 32.2632 76.12 30.31L72.5 33C74.5 30.69 72.5 19.92 72.5 19.92C72.5 19.92 69.86 25.1 53.4 23.78C36.94 22.46 34.63 29 34.63 29C32.63 27 34.63 23.73 34.63 23.73C34.0336 24.0055 33.4974 24.3959 33.0519 24.8788C32.6065 25.3617 32.2606 25.9277 32.034 26.5443C31.8074 27.161 31.7045 27.8163 31.7313 28.4727C31.7581 29.1291 31.9139 29.7738 32.19 30.37L32.33 30.64H27L30.68 33C29.5204 33.7694 28.6291 34.8809 28.13 36.18H18.23V53.62L14.63 57.22L18.23 60.82L19.23 78.31H28.58L27.58 59.8C27.5899 59.7388 27.5873 59.6762 27.5723 59.616C27.5574 59.5558 27.5304 59.4992 27.493 59.4497C27.4557 59.4002 27.4087 59.3587 27.3549 59.3279C27.3011 59.297 27.2416 59.2773 27.18 59.27C27.0582 59.2527 26.9345 59.2839 26.8354 59.3568C26.7363 59.4297 26.6697 59.5386 26.65 59.66C26.64 59.7061 26.64 59.7539 26.65 59.8V74H22.46V59.66L20 57.22L22.45 54.78V40.44H27.11C27 41.5231 26.9799 42.6135 27.05 43.7H30.34C30.5231 41.7027 31.4772 39.8553 33 38.55C38.6 31.63 62.31 35.67 62.31 35.67L64.94 31.79L63.94 35.67C69.52 37 70 43.58 70 43.58H72.5C73.2516 42.6364 73.8428 41.5755 74.25 40.44H77.35V54.78L79.8 57.22L77.35 59.66V74H72.23L73.23 78.31H82.58L81.58 60.82L85.18 57.22L81.58 53.62Z"
                fill="white"
              ></path>
            </svg>

        <div className="flex gap-1 ml-10">
          <Link
            className={`text-sm font-semibold transition delay-75 ease-in-out py-2 px-3 rounded-lg hover:bg-violet-200 hover:text-violet-800 ${
              teams ? "bg-violet-200 text-violet-800" : "text-gray-800"
            }`}
            to="/teams"
          >
            Teams
          </Link>
          <Link
            className={`text-sm font-semibold transition delay-75 ease-in-out py-2 px-3 rounded-lg hover:bg-violet-200 hover:text-violet-800 ${
              projects ? "bg-violet-200 text-violet-800" : "text-gray-800"
            }`}
            to="/projects"
          >
            Projects
          </Link>
        </div>

        <input
          className={`flex items-center h-10 px-4 ml-10 text-sm bg-gray-200 transition delay-75  ease-in-out translate-x-0 ${
            !projects && "-translate-x-[800px]"
          } rounded-full focus:outline-none focus:ring focus:ring-violet-300`}
          type="search"
          placeholder="Search for anything…"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-4">
        <div>
          <div
            className="flex items-center gap-3 py-1 px-3 transition delay-75 ease-in-out rounded-lg hover:bg-violet-200 hover:text-violet-800 cursor-pointer"
            onClick={handleLogout}
          >
            <span className="font-semibold text-gray-600 normal-case">
              {name}
            </span>
            <div className="w-8 rounded-full">
              <img className="rounded-full" src={url(email)} alt={name} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
