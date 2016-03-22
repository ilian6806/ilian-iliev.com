<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"
      "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html>
<head>
	<title>Capitals</title>
	<link rel="stylesheet" type="text/css" href="style.css" />
	<script type="text/javascript" src="script.js"></script>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
</head>
<body onload="char()">
	<div id="wrapper">
	<?php
		$country = array("Greece", "Bulgaria", "Italy", "Spain", "Serbia", "Germany", "Denmark", "Poland", "Ireland", "Ukraine");
		$city = array("Athens" ,"Sofia", "Rome", "Madrid", "Belgrade", "Berlin", "Copenhagen", "Warsaw", "Dublin", "Kiev");
		
		if (isset($_POST["submit"])) {
			$count = $_POST["count"];
		    	$guess = $_POST["guess"];
			//if guessed
		    	if(!(strcasecmp ($_POST["answ"], $city[$count]))){
				$guess++;
			}
		    	//game over
		    	if($count==(count($country)-1)){
		    		if($guess!=0){
						echo '<div id="res"><span>You guessed '.$guess . ' of ' . count($country).' capitals.</span><img src="img/win.png" alt="win" width="200" height="200"/></div>';
		    		}
		    		else {
		    			echo "<div id='res'><span>You didn't guess any capital.<span/><img src='img/loose.png' alt='loose' width='200' height='200'/></div>";
		    		}
		    	}		    	
				
				//check the counter
				if($count < (count($country)-1)){
					$count++;
				}
				else {
					$guess = 0;
					$count = 0;
				}
		}
		else {
			$count = 0;
			$guess = 0;
		}
	?>
	
	<form action='<?php echo($_SERVER["PHP_SELF"]) ?>' method='post'>
		<div id="header">Guessed: <input type="text" name="guess" id="guess" value="<?php echo ($guess) ?>"/>
		<h2>Which is the capital of <?php echo($country[$count]) ?> ?</h2></div>
		<p>
			<input type='hidden' name='count' id="count" value='<?php echo($count) ?>' />
			<input type='text' name='answ' id="answ" autocomplete="off"/><br/>
			<input type='submit' name='submit' value="Check" id="btn" />
		</p>
	</form>
	</div>
</body>
</html>