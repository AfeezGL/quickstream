import { RtcRole, RtcTokenBuilder } from 'agora-token';

// Rtc Examples
const appID = '7ac8167595aa47aeb4ddf6b34353ec38';
const appCertificate = 'c86c68cf5ea6484fa0023c8604a5c6d5';
const role = RtcRole.PUBLISHER;

const expirationTimeInSeconds = 3600;

// IMPORTANT! Build token with either the uid or with the user account. Comment out the option you do not want to use below.
const generateToken = (uid, channelName) => {
	// Build token with uid
	const tokenA = RtcTokenBuilder.buildTokenWithUid(
		appID,
		appCertificate,
		channelName,
		uid,
		role,
		expirationTimeInSeconds,
		expirationTimeInSeconds
	);
	return tokenA;
};

export default generateToken;
