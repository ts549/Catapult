import whisper
from moviepy.editor import VideoFileClip

model = whisper.load_model("base")

def split_video_audio(input_file, video_path, audio_path):
  video = VideoFileClip(input_file)
  video.without_audio().write_videofile(video_path)
  video.audio.write_audiofile(audio_path)
  
def transcribe_audio(input_file):
  result = model.transcribe(input_file)
  return result["text"]

