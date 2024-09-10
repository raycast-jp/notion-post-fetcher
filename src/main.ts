import * as core from '@actions/core'
import { fetchTweetOnSpecificDate } from './notion'
/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const targetDate: string = core.getInput('targetDate')

    // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
    core.debug(`wanna tweet on ${targetDate} ...`)

    const tweet = await fetchTweetOnSpecificDate(new Date(targetDate));
    core.setOutput('tweet', tweet)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
