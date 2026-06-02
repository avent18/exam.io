import Notes from "../models/notesModel.js";

export const getMyNotes = async(req, res)=>{
  try{
    const notes = await Notes.find({user:req.userId}).select("topic classLevel examType revisionMode includeDiagrams content createdAt").sort({createdAt:-1})
    if(!notes) return res.status(404).json({error:"No notes found"});
    return res.status(200).json(notes)
  } catch(error){
    console.error(error);
    return res.status(500).json({message:"getCurrentUser notes error", error:error.message})
  }
}



export const getSingleNote = async(req, res)=>{
  try{
    const notes = await Notes.findOne({_id:req.params.id, user:req.userId});
    if(!notes) return res.status(404).json({error:"No notes found"});
    return res.status(200).json({
      content:notes.content,
      topic:notes.topic,
      classLevel:notes.classLevel,
      createdAt:notes.createdAt,
    })
  } catch(error){
    console.error(error);
    return res.status(500).json({message:"getCurrentUser notes error", error:error.message})
  }
}