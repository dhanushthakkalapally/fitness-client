import { Amplify} from 'aws-amplify';


Amplify.configure({
    // TODO: ALL THIS BELOW CONFIGURATION MUST COME FROM ENV VARIABLES
    Auth: {
        region: "eu-west-2",
         userPoolId: 'eu-west-2_pZVTthPQg',
        userPoolWebClientId: "5b8tjv1c17etbd4kkesvls939i"
    }
})
