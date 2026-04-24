import mongoose from 'mongoose';

const queryHistorySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['crop', 'fertilizer', 'disease'],
      required: true,
    },
    input: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    confidence: {
      type: String,
      default: 'N/A',
    },
  },
  { timestamps: true }
);

const QueryHistory = mongoose.model('QueryHistory', queryHistorySchema);
export default QueryHistory;
