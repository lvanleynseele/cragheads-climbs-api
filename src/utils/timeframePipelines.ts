export const getMonthPipeline = () => {
  const currentDate = new Date();

  // Calculate the start date (30 days ago) and the end date (end of the current month)
  const startDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() - 30,
  );

  const pipeline = {
    $match: {
      createdAt: {
        $gte: startDate,
      },
    },
  };

  return pipeline;
};

export const get6monthPipeline = () => {
  const currentDate = new Date();

  // Calculate the start date (180 days ago) and the end date (end of the current month)
  const startDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 6,
    1,
  );

  const pipeline = {
    $match: {
      createdAt: {
        $gte: startDate,
      },
    },
  };

  return pipeline;
};

export const getYearPipeline = () => {
  const currentDate = new Date();

  // Calculate the start date (365 days ago) and the end date (end of the current month)
  const startDate = new Date(
    currentDate.getFullYear() - 1,
    currentDate.getMonth(),
    currentDate.getDate(),
  );

  const pipeline = {
    $match: {
      createdAt: {
        $gte: startDate,
      },
    },
  };

  return pipeline;
};
