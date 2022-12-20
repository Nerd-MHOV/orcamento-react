<?php 
	include ('../../config.php');
	$id_user = $_SESSION['id_user'];
	$usuario = Painel::select('_usuarios' ,'id=?', array($id_user));
	$hoje = date('Y-m-d H:i:s');
	$validade = date('Y-m-d', strtotime('+3 days'));
	$id_post = uniqid();
	$deal_id = 0;
	$countRow = 0;
	for($i = 0; $i < count($_POST['n_pipe']); $i++){
		$countRow++;
		if($_POST['n_pipe'][$i] != '0'){
			$deal_id = $_POST['n_pipe'][$i];
		}
	}



	//DOMPDF
	require '../../vendor/autoload.php';
	use Dompdf\Dompdf;
	use Dompdf\Options;
	$options = new Options();
	$options -> setChroot(__DIR__);
	$options -> setIsRemoteEnabled(true);
	$dompdf = new Dompdf($options);
	ob_start();
	require __DIR__."/document.php";
	$dompdf->loadHtml(ob_get_clean());
	$altura = (48*$countRow)+975;
	$dompdf->set_paper(array(0,0,600,$altura));
    $dompdf->render();                                                     // Render the HTML as PDF
	$options = ['Attachment' => 0];
    // GAMBIARRA PARA RENOMEAR
    $tarifarioEmConta = min($_POST['tarifario_real']);
    $key = array_keys($_POST['tarifario_real'], $tarifarioEmConta);
    $nomeTemporada = $_POST['temporada'][$key[0]];
    $nomeTemporada = Painel::select('_lista de tarifarios', 'id=?', array($nomeTemporada))['completo'];


    $fileName = './arquivosPdf/Orçamento-'.$deal_id.'-'.$nomeTemporada.'.pdf';
    file_put_contents($fileName, $dompdf->output());
	$dompdf->stream($fileName, $options);                                // Output the generated PDF to Browser
    echo $fileName."<hr>";
	//ENVIAR BD
	for($i = 0; $i < $countRow; $i++){
		$checkin = $_POST['checkin'][$i];
		$checkout = $_POST['checkout'][$i];
		$diarias = $_POST['diarias'][$i];
		$temporada = $_POST['temporada'][$i];
		$categoria = $_POST['categoria'][$i];
		$adutos = $_POST['adutos'][$i];
		$crianças = $_POST['crianças'][$i];
		$pet = $_POST['pet'][$i];
		$requerimentos = $_POST['requerimentos'][$i];
		$desconto = $_POST['desconto'][$i];
			$desconto = ($desconto*100).'%';
		$tarifario_cheio = $_POST['tarifario_cheio'][$i];
		$tarifario_real = $_POST['tarifario_real'][$i];

		$sql = MySql::conectar()->prepare("INSERT INTO `_savepoint` VALUES (null, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
		$sql->execute(array($id_post, $id_user, $deal_id, $hoje, $validade, $checkin, $checkout, $diarias, $adutos, $crianças, $pet, $requerimentos, $temporada, $categoria, $desconto, $tarifario_cheio, $tarifario_real));
	}

	//PIPEDRIVE
	$apiToken = $usuario['token_user'];
	$client = new Pipedrive\Client(null, null, null, $apiToken);
	//ANEXAR ARQUIVO
	try {
		$fileOptions['file'] = $fileName;
		$fileOptions['dealId'] = $deal_id;
        print_r($fileOptions);
        echo $apiToken."<br>";

		$client->getFiles()->addFile($fileOptions);
	    echo 'Arquivo Anexado com Sucesso<br>';
	} catch (\Pipedrive\APIException $e) {
	    echo 'ERRO ARQUIVO<br>';
	    echo $e."<br>";
	}
	//MUDAR PIPELINE
	try {
		$dealOptions['id'] = $deal_id;
		$dealOptions['stage_id'] = 242;
		$dealOptions['user_id'] = $usuario['userpipe'];

		$client->getDeals()->updateADeal($dealOptions);
	    echo 'Pipeline Sucesso<br>';
	} catch (\Pipedrive\APIException $e) {
	    echo 'ERRO Pipeline<br>';
	    echo $e;
	}
	//ADICIONAR PRODUTO:
	try {
		$tarifarioEmConta = min($_POST['tarifario_real']);
		$key = array_keys($_POST['tarifario_real'], $tarifarioEmConta);
		$temporada = $_POST['temporada'][$key[0]];
		$temporada = Painel::select('_lista de tarifarios', 'id=?', array($temporada))['produto'];
		$temporada;
		$body = array(
			'product_id' => $temporada,
			'item_price' => $tarifarioEmConta,
			'quantity' => 1,
		);
		$productsOptions['id'] = $deal_id;
		$productsOptions['body'] = $body;

		$client->getDeals()->addAProductToTheDealEventuallyCreatingANewItemCalledADealProduct($productsOptions);
	    echo 'Pipeline Sucesso<br>';
	} catch (\Pipedrive\APIException $e) {
	    echo 'ERRO Pipeline<br>';
	    echo $e;
	}		

	//APAGAR ARQUIVO:
	@unlink($fileName);
