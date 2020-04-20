module.exports = {
  Spin: ({ Schema }) => new Schema(
    {
      date: {
        type: Date,
        default: Date.now
      },
      result: String
    },
    {
      collection: 'spins'
    }
  )
};
