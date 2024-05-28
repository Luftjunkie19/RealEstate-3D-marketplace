import React from 'react';

import {
  Constants,
  useMediaDevice,
} from '@videosdk.live/react-sdk';

type Props = {}



function PreSetupScreen({ }: Props) {
    const { checkPermissions } = useMediaDevice();

    const checkMediaPermissions = async () => {
        const checkAudioPermission = await checkPermissions(Constants.permission.AUDIO);
        const checkVideoPermission = await checkPermissions(Constants.permission.VIDEO);
        const checkVideoAndAudioPermission = await checkPermissions(Constants.permission.AUDIO_AND_VIDEO);
    }

    return (
    <div>PreSetupScreen</div>
  )
}

export default PreSetupScreen