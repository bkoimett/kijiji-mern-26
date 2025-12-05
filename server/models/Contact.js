// server/models/Contact.js - CORRECTED VERSION
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },
    inquiryType: {
      type: String,
      enum: [
        "general",
        "appointment",
        "counseling",
        "facility",
        "other",
        "corporate",
        "wedding",
        "birthday",
        "conference",
        "private",
        "catering",
      ],
      default: "general",
    },
    // NEW BOOKING FIELDS - Make them optional initially
    eventDate: {
      type: Date,
      // Remove the required validation here, handle it in middleware
    },
    eventTime: {
      type: String,
      trim: true,
    },
    numberOfGuests: {
      type: Number,
      min: 1,
    },
    status: {
      type: String,
      enum: [
        "new",
        "contacted",
        "resolved",
        "confirmed",
        "pending",
        "cancelled",
      ],
      default: "new",
    },
    adminNotes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Add a pre-save middleware to handle conditional validation
contactSchema.pre("save", function (next) {
  const bookingTypes = [
    "corporate",
    "wedding",
    "birthday",
    "conference",
    "private",
    "catering",
  ];

  // If this is a booking inquiry, check for required fields
  if (bookingTypes.includes(this.inquiryType)) {
    const errors = [];

    if (!this.eventDate) {
      errors.push("Event date is required for booking inquiries");
    }
    if (!this.eventTime) {
      errors.push("Event time is required for booking inquiries");
    }
    if (!this.numberOfGuests) {
      errors.push("Number of guests is required for booking inquiries");
    }

    if (errors.length > 0) {
      const error = new mongoose.Error.ValidationError(null);
      for (const errMsg of errors) {
        error.addError(
          "inquiryType",
          new mongoose.Error.ValidatorError({
            message: errMsg,
            path: "inquiryType",
            value: this.inquiryType,
          })
        );
      }
      return next(error);
    }
  }

  next();
});

// Index for better query performance
contactSchema.index({ status: 1, createdAt: -1 });
contactSchema.index({ email: 1, createdAt: -1 });
contactSchema.index({ inquiryType: 1, status: 1 });

export default mongoose.model("Contact", contactSchema);
