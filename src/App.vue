<template>
	<div id="app">
		<head-menu />
		<checkout />
	</div>
</template>

<script>
import '@/assets/scss/main.scss'

import HeadMenu from '@/components/HeadMenu'
import Checkout from '@/views/Checkout'

export default {
	name: 'app',

	components: {
		HeadMenu,
		Checkout,
	},
}
</script>
