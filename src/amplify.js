import { Amplify, Auth} from 'aws-amplify';


Amplify.configure({
    // TODO: ALL THIS BELOW CONFIGURATION MUST COME FROM ENV VARIABLES
    Auth: {
        region: "eu-west-2",
         userPoolId: 'eu-west-2_3AEkGAgp0',
        userPoolWebClientId: "niiujdivoskfv07h95r8cm9br"
    }
})
