import Room from "../models/room.model.js";

export const createRoom = async (req, res, next) => {
  try {
    const listing = await Room.create(req.body);
    res.status(201).json({
      listing,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteRoom = async (req, res, next) => {
  try {
    // 1. Actually await the database query
    const listing = await Room.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // 3. Delete the listing
    await Room.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    next(error);
  }
};
export const updateRoom = async (req, res, next) => {
  try {
    const listing = await Room.findByIdAndUpdate(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: "Room not found" });
    }
    const updatedListing = await Room.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({
      message: "Listing updated successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const getRoom = async (req, res, next) => {
  try {
    const listing = await Room.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};
export const getAllRooms = async (req, res, next) => {
  try {
    const listings = await Room.find({});
    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

