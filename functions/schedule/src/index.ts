import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { updateCurrentYearSchedule } from './scheduleService';

export const handler = async (
    event: APIGatewayEvent,
    context: Context
): Promise<APIGatewayProxyResult> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    try {
        await updateCurrentYearSchedule();
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'There was an error', error }),
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Success!' }),
    };
};
