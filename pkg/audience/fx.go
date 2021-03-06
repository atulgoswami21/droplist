package audience

import "go.uber.org/fx"

var Fx = fx.Provide(
	NewSvc,
	NewSQLRepo,

	NewRouter,
	NewSummaryRoute,
	NewListContactsRoute,
	NewDeleteContactsRoute,
	NewCreateContactsRoute,
	NewUnsubscribeContactRoute,
)
