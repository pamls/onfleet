const parameters: CreateTaskProps = {
	destination: destination,
	recipients: [
		{
			name: order.details.name + ' ' + order.customer.firstName + ' ' + order.customer.lastName,
			phone: order.customer.phone,
			notes: order.details.note,
			skipSMSNotifications: true,
			skipPhoneNumberValidation: true
		}
	],
	completeAfter: deliveryTime,
	completeBefore: deliveryTime + (15 * 60 * 1000),
	pickupTask: false,
	dependencies: [],
	notes: orderDetails,
	container: {
		type: 'TEAM',
		team: teamId,
		considerDependencies: false
	},
	quantity: 1,
	serviceTime: 2,
	metadata: [{
		name: 'shop',
		type: 'string',
		visibility: ['api'],
		value: shop.key
	}, {
		name: 'location',
		type: 'number',
		visibility: ['api'],
		value: location.id
	}, {
		name: 'restaurant',
		type: 'string',
		visibility: ['api', 'dashboard'],
		value: shop.name
	}]
} as CreateTaskProps;

const onfleet: typeof Onfleet = new Onfleet(this.apiKey);
const response: any = await onfleet.tasks.create(parameters);