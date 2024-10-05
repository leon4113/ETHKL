const { verifyCloudProof } = require('@worldcoin/idkit-core/backend');
const { VerificationLevel } = require('@worldcoin/idkit-core');

// Load environment variables from .env file
const app_id = process.env.NEXT_PUBLIC_WLD_APP_ID;
const action = process.env.NEXT_PUBLIC_WLD_ACTION;

async function verify(proof, signal) {
  try {
    const verifyRes = await verifyCloudProof(proof, app_id, action, signal);
    if (verifyRes.success) {
      return { success: true };
    } else {
      return {
        success: false,
        code: verifyRes.code,
        attribute: verifyRes.attribute,
        detail: verifyRes.detail,
      };
    }
  } catch (error) {
    return {
      success: false,
      code: 'internal_error',
      detail: error.message || 'An internal error occurred',
    };
  }
}

module.exports = { verify };
