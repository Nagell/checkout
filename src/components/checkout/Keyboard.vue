<template>
	<div class="c-keyboard">
		<ul>
			<li :key="key" v-for="(button, key) in buttons" @click="keyClicked(button)">
				<span v-if="button === 'backspace'">
					<i class="fas fa-backspace" />
				</span>
				<span v-else>{{ button }}</span>
			</li>
		</ul>
	</div>
</template>

<script>
import config from '@/config'

export default {
	name: 'keyboard',

	data() {
		return {
			config: config,
			buttons: config.keyboard,
		}
	},

	methods: {
		keyClicked(key) {
			this.$emit('key-clicked', { key: key, sample: false })
		},
	},
}
</script>
