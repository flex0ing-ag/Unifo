// "use client";

// import { useAppSelector } from "@/app/redux";
// import Header from "@/components/Header";
// import { useGetProjectsQuery } from "@/state/api";
// import { DisplayOption, Gantt, ViewMode } from "gantt-task-react";
// import "gantt-task-react/dist/index.css";
// import React, { useMemo, useState } from "react";

// type TaskTypeItems = "task" | "milestone" | "project";

// const Timeline = () => {
//   const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
//   const { data: projects, isLoading, isError } = useGetProjectsQuery();

//   const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
//     viewMode: ViewMode.Month,
//     locale: "en-US",
//   });

//   const ganttTasks = useMemo(() => {
//     return (
//       projects?.map((project) => ({
//         start: new Date(project.startDate as string),
//         end: new Date(project.endDate as string),
//         name: project.name,
//         id: `Project-${project.id}`,
//         type: "project" as TaskTypeItems,
//         progress: 50,
//         isDisabled: false,
//       })) || []
//     );
//   }, [projects]);

//   const handleViewModeChange = (
//     event: React.ChangeEvent<HTMLSelectElement>,
//   ) => {
//     setDisplayOptions((prev) => ({
//       ...prev,
//       viewMode: event.target.value as ViewMode,
//     }));
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (isError || !projects)
//     return <div>An error occurred while fetching projects</div>;

//   return (
//     <div className="max-w-full p-8">
//       <header className="mb-4 flex items-center justify-between">
//         <Header name="Projects Timeline" />
//         <div className="relative inline-block w-64">
//           <select
//             className="focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white"
//             value={displayOptions.viewMode}
//             onChange={handleViewModeChange}
//           >
//             <option value={ViewMode.Day}>Day</option>
//             <option value={ViewMode.Week}>Week</option>
//             <option value={ViewMode.Month}>Month</option>
//           </select>
//         </div>
//       </header>

//       <div className="overflow-hidden rounded-md bg-white shadow dark:bg-dark-secondary dark:text-white">
//         <div className="timeline">
//           <Gantt
//             tasks={ganttTasks}
//             {...displayOptions}
//             columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
//             listCellWidth="100px"
//             projectBackgroundColor={isDarkMode ? "#101214" : "#1f2937"}
//             projectProgressColor={isDarkMode ? "#1f2937" : "#aeb8c2"}
//             projectProgressSelectedColor={isDarkMode ? "#000" : "#9ba1a6"}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Timeline;


"use client";

import React, { useMemo, useState } from "react";
import moment from "moment";
import Timeline from "react-calendar-timeline";
import "react-calendar-timeline/style.css";
import { useAppSelector } from "@/app/redux";
import { useGetProjectsQuery } from "@/state/api";
import Header from "@/components/Header";

type ViewMode = "day" | "week" | "month";

const TimelinePage = () => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const { data: projects, isLoading, isError } = useGetProjectsQuery();
  const [viewMode, setViewMode] = useState<ViewMode>("month");

  const groups = [{ id: 1, title: "Projects" }];

  const items = useMemo(() => {
    if (!projects || !Array.isArray(projects)) return [];

    return projects
      .filter(
        (project) =>
          project.startDate &&
          project.endDate &&
          !isNaN(new Date(project.startDate).getTime()) &&
          !isNaN(new Date(project.endDate).getTime())
      )
      .map((project, index) => ({
        id: index + 1,
        group: 1,
        title: project.name,
        start_time: moment(project.startDate),
        end_time: moment(project.endDate),
        itemProps: {
          style: {
            background: isDarkMode ? "#374151" : "#3b82f6",
            color: "white",
            borderRadius: "6px",
            padding: "4px 8px",
            fontWeight: "500",
          },
        },
      }));
  }, [projects, isDarkMode]);

  const timeRange = useMemo(() => {
    const now = moment();
    switch (viewMode) {
      case "day":
        return {
          start: now.clone().startOf("day").subtract(12, "hours"),
          end: now.clone().endOf("day").add(12, "hours"),
        };
      case "week":
        return {
          start: now.clone().startOf("week").subtract(1, "day"),
          end: now.clone().endOf("week").add(1, "day"),
        };
      default:
        return {
          start: now.clone().startOf("month").subtract(1, "week"),
          end: now.clone().endOf("month").add(1, "week"),
        };
    }
  }, [viewMode]);

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (isError || !projects)
    return <div className="p-4 text-red-600">Error loading projects.</div>;

  return (
    <div className="max-w-full p-4 xl:p-8">
      <header className="mb-4 flex items-center justify-between">
        <Header name="Projects Timeline" />
        <select
          value={viewMode}
          onChange={(e) => setViewMode(e.target.value as ViewMode)}
          className="rounded-md border border-gray-400 bg-white px-3 py-2 text-sm dark:border-dark-secondary dark:bg-dark-secondary dark:text-white"
        >
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
        </select>
      </header>

      <div className="overflow-hidden rounded bg-white shadow dark:bg-dark-secondary dark:text-white">
        <Timeline
          groups={groups}
          items={items}
          defaultTimeStart={timeRange.start.valueOf()}
          defaultTimeEnd={timeRange.end.valueOf()}
          lineHeight={60}
          itemHeightRatio={0.75}
          canMove={false}
          canResize={false}
          canChangeGroup={false}
        />
      </div>
    </div>
  );
};

export default TimelinePage;
