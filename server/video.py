import whisper
from moviepy.editor import VideoFileClip

model = whisper.load_model("base")

def video_to_audio(input_file, output_file):
  video = VideoFileClip(input_file)
  video.audio.write_audiofile(output_file)
  
def parse_video(input_file):
  result = model.transcribe(input_file)
  return result

