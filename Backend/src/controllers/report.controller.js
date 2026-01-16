export const getCategoryReport = async (req, res) => {
  const report = await Expense.aggregate([
    { $match: { user: req.user._id } },
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" },
      },
    },
  ]);

  res.json({
    success: true,
    report,
  });
};
