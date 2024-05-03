import { createCameraVideoTrack , createMicrophoneAudioTrack } from "@videosdk.live/react-sdk";

const useMediaStream = () => {

  const getVideoTrack = async ({ webcamId, encoderConfig }: { webcamId: string; encoderConfig: "h540p_w960p" | "h90p_w160p" | "h180p_w320p" | "h216p_w384p" | "h360p_w640p" | "h720p_w1280p" | "h1080p_w1920p" | "h1440p_w2560p" | "h2160p_w3840p" | "h120p_w160p" | "h180p_w240p"; }) => {
    try {
      const track = await createCameraVideoTrack({
        cameraId: webcamId ,
        encoderConfig: encoderConfig ?  encoderConfig :"h540p_w960p",
        optimizationMode: "motion",
        multiStream: false,
      });

      return track;
    } catch(error) {
      return null;
    }
  };

  const getAudioTrack = async ({micId}:{micId:string}) => {
    try{
      const track = await createMicrophoneAudioTrack({
        microphoneId: micId
      });
      return track;
    } catch(error) {
      return null;
    }
  };

  return { getVideoTrack,getAudioTrack };
};

export default useMediaStream;