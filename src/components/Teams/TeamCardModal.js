import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  useAddTeamsMutation,
  useGetAllTeamsQuery,
} from "../../features/teams/teamsApi";
import Error from "../common/Error";

const TeamCardModal = ({ setIsOpen }) => {
  // local state
  const [team, setTeam] = useState("");
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("red");
  const [skipReq, setSkipReq] = useState(true);
  const [disabled, setDisabled] = useState(true);

  // user
  const { user } = useSelector((state) => state.auth) || {};
  const { email } = user || {};

  const { data: teams } = useGetAllTeamsQuery(
    { team: team.toLowerCase() },
    { skip: skipReq }
  );

  const [addTeams, { isSuccess, isLoading }] = useAddTeamsMutation();

  useEffect(() => {
    if (teams?.length === 0 && title?.length > 0) {
      setDisabled(false);
    } else if (teams?.length > 0 || title?.length === 0) {
      setDisabled(true);
    }
  }, [teams, title]);

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
    if (value.length > 0) {
      setTeam(value);
      setSkipReq(false);
    }
  };

  const handleSearch = debounceHandler(doSearch, 500);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTeams({
      team: team.toLowerCase(),
      title,
      color,
      email,
      date: new Date().getTime(),
      members: [user],
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
      toast.success("Team added successfully!");
    }
  }, [isSuccess, setIsOpen]);

  return (
    <div className="fixed top-0 left-0 w-full flex items-center justify-center bg-violet-500 h-full bg-opacity-60 z-10">
      <div className="absolute w-full h-full bg-slate-900 bg-opacity-60"></div>
      <div className="relative bg-[#F9FAFB] w-11/12 md:w-2/5 sm:w-3/5 rounded-lg p-8 z-10">
        <div className="flex justify-between border-b pb-4">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-center">
            Add new team!
          </h3>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 transition-all hover:bg-gray-200 rounded-lg"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <div>
              <input
                id="team-name"
                name="team"
                type="text"
                autoComplete="team-name"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                placeholder="Team name"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <select
              name=""
              id=""
              className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
              onChange={(event) => setColor(event.target.value)}
            >
              <option value="red">Red</option>
              <option value="green">Green</option>
              <option value="yellow">Yellow</option>
              <option value="violet">Violet</option>
              <option value="pink">Pink</option>
              <option value="orange">Orange</option>
              <option value="teal">Teal</option>
            </select>
            <div>
              <textarea
                id="team-title"
                name="title"
                type="text"
                autoComplete="team-title"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                placeholder="Team description"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 disabled:bg-gray-300 disabled:hover:bg-gray-300"
              disabled={disabled || isLoading}
            >
              Add team
            </button>
          </div>

          {teams?.length > 0 && (
            <Error message={"Team already exist! Try another name."} />
          )}
        </form>
      </div>
    </div>
  );
};

export default TeamCardModal;
