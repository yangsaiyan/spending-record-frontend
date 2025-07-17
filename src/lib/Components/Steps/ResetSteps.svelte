<script lang="ts">
	import { isShowingSteps } from '$lib/store/store';
</script>

<ul class="steps">
	<li class="step transitionStep" class:step-primary={$isShowingSteps[0]}>
		<span class="step-icon">{!$isShowingSteps[0] ? '😕' : '😃'}</span>{!$isShowingSteps[0]
			? 'Sending request to server'
			: 'Request sent to server'}
	</li>
	<li class="step" class:step-primary={$isShowingSteps[1]}>
		<span class="step-icon">{!$isShowingSteps[1] ? '😃' : '😍'}</span>{!$isShowingSteps[1]
			? 'Processing request'
			: 'Request processed'}
	</li>
	<li class="step" class:step-primary={$isShowingSteps[2]}>
		<span class="step-icon">{!$isShowingSteps[2] ? '😍' : '✅'}</span>{!$isShowingSteps[2]
			? 'Sending OTP to email'
			: 'OTP sent to email'}
	</li>
</ul>
